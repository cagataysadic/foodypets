<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    public function index()
{
    $userId = Auth::id();
    $cartItems = CartItem::where('user_id', $userId)
                          ->with('product')
                          ->get()
                          ->map(function ($item) {
                                return [
                                    'id' => $item->id,
                                    'quantity' => $item->quantity,
                                    'product_id' => $item->product->id,
                                    'image' => $item->product->image_url,
                                    'name' => $item->product->name,
                                    'price' => $item->product->price
                                ];
                            });

    return response()->json($cartItems);
}


    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $userId = Auth::id();
        $productId = $request->product_id;
        $quantity = $request->quantity;

        $cartItem = CartItem::where('user_id', $userId)
                            ->where('product_id', $productId)
                            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $quantity
            ]);
        }

        return response()->json($cartItem, 201);
    }

    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->quantity -= 1;

        if ($cartItem->quantity <= 0) {
            $cartItem->delete();
            return response()->json(['message' => 'Item removed from cart']);
        } else {
            $cartItem->save();
            return response()->json(['message' => 'Item quantity decreased', 'quantity' => $cartItem->quantity]);
        }
        
    }

    public function clearCart()
    {
        CartItem::where('user_id', Auth::id())->delete();
        return response()->json(['message' => 'Cart cleared'], 200);
    }
}
