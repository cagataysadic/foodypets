<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'orders.*.product_id' => 'required|exists:products,id',
            'orders.*.quantity' => 'required|integer|min:1',
            'orders.*.price' => 'required|numeric',
        ]);

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_price' => collect($request->orders)->sum(fn($item) => $item['price'] * $item['quantity']),
            'status' => 'pending',
        ]);

        foreach ($request->orders as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json(['message' => 'Order created successfully', 'order_id' => $order->id]);
    }

}
