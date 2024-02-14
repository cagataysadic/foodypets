<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'ACANA',
            'species' => 'cat',
            'type' => 'food',
            'flavor' => 'Beef, Chicken & Tuna',
            'form' => 'Wet Food',
            'description' => 'High protein cat food thoughtfully crafted with 85% animal ingredients** and no grains*** to nourish and satisfy your cat completely with every bite. Delicious cat food recipe with beef, chicken and tuna to provide the animal protein your cat craves.',
            'price' => 41.99,
            'image_url' => 'products/cat/food/acana.jpg'
        ]);
        Product::create([
            'name' => 'PURINA Fancy Feast',
            'species' => 'cat',
            'type' => 'food',
            'flavor' => 'Chicken',
            'form' => 'Aspic/Gelee',
            'description' => 'Spectacular layered creations featuring delicious mousse pate cat food topped with a layer of mouthwatering gravy. Each delectable serving of this 100 percent complete and balanced Fancy Feast wet cat food mousse with chicken pate comes in a cat-pleasing Gem shape for ease of eating.',
            'price' => 19.84,
            'image_url' => 'products/cat/food/purina-fancy-feast.jpg'
        ]);
        Product::create([
            'name' => 'Friskies',
            'species' => 'cat',
            'type' => 'food',
            'flavor' => 'Chicken, Turkey & Cheese',
            'form' => 'Gravy',
            'description' => 'The package dimension of the product is 13.8"L x 6.9"W x 6.1"H. The package weight of the product is 12.4 Pound.',
            'price' => 46.11,
            'image_url' => 'products/cat/food/friskies.jpg'
        ]);
        Product::create([
            'name' => 'Meow Mix',
            'species' => 'cat',
            'type' => 'food',
            'flavor' => 'Variety Pack: Seafood Selections',
            'form' => 'Wet Food',
            'description' => 'Eight (8) cups of Tenders in Sauce With REAL Tuna & Whole Shrimp, eight (8) cups of Chunks in Gravy With REAL Salmon & Ocean Fish, and eight (8) cups of Chunks in Gravy With REAL Tuna & Crab. Tenders in Sauce were previously known as Meow Mix Tender Favorites, and Chunks in Gravy were previously known as Meow Mix Savory Morsels.',
            'price' => 30.20,
            'image_url' => 'products/cat/food/meow-mix.jpg'
        ]);
        Product::create([
            'name' => "Purina Pro Plan",
            'species' => 'cat',
            'type' => 'food',
            'flavor' => 'Chicken & Rice',
            'form' => 'Crunchy, Kibble',
            'description' => 'Promotes muscle mass maintenance during weight loss. High protein formula, with real chicken as the first ingredient. Fortified with guaranteed live probiotics to support digestive and immune health. Used to be known as FOCUS Weight Management Chicken and Rice Formula.',
            'price' => 29.00,
            'image_url' => "products/cat/food/purina-pro-plan.jpg"
        ]);
        Product::create([
            'name' => 'Garnpet',
            'species' => 'cat',
            'type' => 'bed',
            'dimensions' => '16.5"D x 16.5"W x 13"H',
            'material' => 'Linen Type',
            'description' => 'Designed for maximum comfort, this cat cube house provides a cozy retreat for your pet. The soft and plush material ensures your cat feels safe and snug, providing them with a comfortable space to curl up and relax.',
            'price' => 34.99,
            'image_url' => 'products/cat/bed/garnpet.jpg'
        ]);
        Product::create([
            'name' => 'Golopet',
            'species' => 'cat',
            'type' => 'bed',
            'dimensions' => '15"D x 15"W x 10.5"H',
            'material' => 'Cotton',
            'description' => 'Made of soft little rabbit fleece and oxford cloth, filled with PP cotton inside, this cat burrow bed enjoys soft, warm and comfortable, no odor, and is friendly to pets skin. Cats sleep in this soft litter like lying on marshmallows. Let your cat sleep more comfortably and warmly in winter.',
            'price' => 22.99,
            'image_url' => 'products/cat/bed/golopet.jpg'
        ]);
        Product::create([
            'name' => "Love's cabin",
            'species' => 'cat',
            'type' => 'bed',
            'dimensions' => '19.7"L x 19.7"W x 5.9"Th',
            'material' => 'Suede',
            'description' => "Love's cabin cat and dog beds feature nest-like walls, round pet bed offers a safe, warm cozy place for a cat or small dog to snooze.In order to better maintain the shape of the donut nest，our interior filling is 25% more than most competition.",
            'price' => 19.99,
            'image_url' => "products/cat/bed/love's-cabin.jpg"
        ]);
        Product::create([
            'name' => 'Zerbuger',
            'species' => 'cat',
            'type' => 'bed',
            'dimensions' => '20"L x 20"W x 6"Th',
            'material' => 'Polyester',
            'description' => "The round pet bed allows your cute animal friends to have their own space, a place where they can curl up and relax. The raised edges create a sense of security and provide soft support for your pet's head and neck, which can relieve muscle and joint pain. This donut pet bed is ideal for animal friends who like to curl up.",
            'price' => 23.99,
            'image_url' => 'products/cat/bed/zerbuger.jpg'
        ]);
        Product::create([
            'name' => "Raimaiso",
            'species' => 'cat',
            'type' => 'bed',
            'dimensions' => '20"L x 20"W x 7"Th',
            'material' => 'Polyester',
            'description' => "Comfortable, soft and fluffy Faux Fur. The anti-anxiety dog bed is reminiscent of a mother's warm hug.Filled with high fluffy PP cotton to ensure thickness and strong support. It is very suitable for pets who like to curl up. The raised edge design provides head and neck support. The super soft filler can relieve joint and muscle pain for your pet friends.",
            'price' => 24.99,
            'image_url' => "products/cat/bed/raimaiso.jpg"
        ]);
        Product::create([
            'name' => 'Kitty City',
            'species' => 'cat',
            'type' => 'bowl',
            'material' => 'Plastic',
            'description' => 'Modern pedestal design promotes natural, healthy eating posture and looks great in your home. Whisker-friendly oval design plus easy-access front – better ergonomics for your cat companion!',
            'price' => 12.99,
            'image_url' => 'products/cat/bowl/kitty-city.jpg'
        ]);
        Product::create([
            'name' => 'Marchul',
            'species' => 'cat',
            'type' => 'bowl',
            'material' => 'Plastic',
            'description' => 'Siphon principle, automatic water supply and maintain a stable water level, 17oz, large-capacity water bottle, can meet the drinking water needs of cats/small dogs for 2-3 days, even when not at home, you can let cats drink clean water.Moreover, the pet food and water bowl set is detachable, easy to clean.',
            'price' => 12.99,
            'image_url' => 'products/cat/bowl/marchul.jpg'
        ]);
        Product::create([
            'name' => 'Milifun',
            'species' => 'cat',
            'type' => 'bowl',
            'material' => 'Polyester',
            'description' => '2 in 1 feeder bowl. One food bowl, one plastic bowl with automatic water bottle. It will refill the water into the dish automatically and keep the water clean whether you at home or not. Suitable for Medium and Small Pets. Your small pets will like this gift,try our special water and food bowl set for your baby cats or dogs.',
            'price' => 12.69,
            'image_url' => 'products/cat/bowl/milifun.jpg'
        ]);
        Product::create([
            'name' => 'Petlibro',
            'species' => 'cat',
            'type' => 'bowl',
            'material' => 'Stainless Steel',
            'description' => 'Easily schedule up to six meals daily and up to 50 portions per meal. View the timed cat feeder’s status clearly on the LED display. Also, a manual feeding button makes it easy to give your pet a snack (up to 5 portions).',
            'price' => 65.99,
            'image_url' => 'products/cat/bowl/petlibro.jpg'
        ]);
        Product::create([
            'name' => "Serentive",
            'species' => 'cat',
            'type' => 'bowl',
            'material' => 'Stainless Steel',
            'description' => 'Premium-quality and BPA-Free material ensures cat bowl will not be deformed whether your cat or puppy bites or plays. Application of superb polishing technology keeps stainless steel cat bowls is produced clean with a longer product life cycle. Stainless steel cat bowls for food and water.',
            'price' => 7.99,
            'image_url' => "products/cat/bowl/serentive.jpg"
        ]);
        Product::create([
            'name' => 'Cussiou',
            'species' => 'all',
            'type' => 'carrier',
            'dimensions' => '17"L x 12"W x 11"H',
            'material' => 'Polyester',
            'description' => 'Small pet carrier have cozy wool fleece pad can be removed and machine-washed, dog carrier side has a storage zipper pockets can be used to store food for your pets. Also, comes with a collapsible bowl for food, Pet ID Card, Reflective Strip-Safer to travel at night, you can take your pet anywhere, and let your pet and you have a wonderful and happy trip.',
            'price' => 16.99,
            'image_url' => 'products/cat/carrier/cussiou.jpg'
        ]);
        Product::create([
            'name' => 'Henkelion',
            'species' => 'all',
            'type' => 'carrier',
            'dimensions' => '17"L x 11"W x 11"H',
            'material' => 'Polyester',
            'description' => 'With airline-approved design, you can take your pet to go to everywhere. This pet carrier provides two connecting loop handles for balanced carrying as a dual seat belt or luggage strap to secure transport. The adjustable shoulder strap help you hands-free carrying and makes it more safe and convenient pet carrier bag for your travel.',
            'price' => 23.99,
            'image_url' => 'products/cat/carrier/henkelion.jpg'
        ]);
        Product::create([
            'name' => "Morpilot",
            'species' => 'all',
            'type' => 'carrier',
            'dimensions' => '17.3"L x 12.2"W x 13.4"H',
            'material' => 'Polyester',
            'description' => "The size of this cat carrier is: 17.3*12.2*13.4 inch, Recommend for pets up to 15lbs ( Please measure the size and weight of your pet before purchasing this product). It comes with a folding blue bowl as a gift comes in and a soft cushion. With this lightweight bag, you can take your pet anywhere, and let your pet and your pet have a wonderful and happy trip.",
            'price' => 26.39,
            'image_url' => "products/cat/carrier/morpilot.jpg"
        ]);
        Product::create([
            'name' => 'Prodigen',
            'species' => 'all',
            'type' => 'carrier',
            'dimensions' => '17.2"L x 10"W x 11"H',
            'material' => 'Polyester',
            'description' => 'Mesh windows on top and all 4 sides provide optimal airflow. Some have zippers to quickly reach your pet to comfort, touch, or take in or out. Weighing in at only 2.3 lbs, Designed with Breathable Mesh on all Sides for Proper Ventilation * Removable Fleece Travel Bed * Padded Shoulder Strap * Storage Compartment for Treats or Meds, Seatbelt Compatible.',
            'price' => 18.99,
            'image_url' => 'products/cat/carrier/prodigen.jpg'
        ]);
        Product::create([
            'name' => "Texsens",
            'species' => 'all',
            'type' => 'carrier',
            'dimensions' => '12.6"L x 11.4"W x 16.5"H',
            'material' => 'Polyvinyl Chloride (PVC)',
            'description' => 'Perfect for dogs up to 15-pounds, or cats up to 18-pounds. Easily fits cats, small dogs, and most other small/medium-sized pets! Please make sure your pet sits within 14.5 inches overall height and 12 inches wide. Three side was made of PVC mesh for the carriers. Well ventilated design for optimal airflow and checking on pet',
            'price' => 24.99,
            'image_url' => "products/cat/carrier/texsens.jpg"
        ]);
        Product::create([
            'name' => 'Cesar',
            'species' => 'dog',
            'type' => 'food',
            'flavor' => 'Variety Pack',
            'form' => 'Wet Food',
            'description' => 'A complete and balanced gourmet meal or complement your dog will love. No fillers or artificial flavors for a taste and variety your best friend can’t resist.',
            'price' => 51.79,
            'image_url' => 'products/dog/food/cesar.jpg'
        ]);
        Product::create([
            'name' => 'Iams',
            'species' => 'dog',
            'type' => 'food',
            'flavor' => 'Chicken',
            'form' => 'Dry Food',
            'description' => 'If your dog has weight issues, this dry dog food with real chicken and 17 percent less fat than our Minichunks recipe can give them the support they need to help them maintain a healthy weight. Features a wholesome blend of fibers and natural prebiotics for healthy digestion and L-carnitine to help support a healthy metabolism, plus premium-quality protein from chicken and egg to help promote strong muscles.',
            'price' => 47.41,
            'image_url' => 'products/dog/food/iams.jpg'
        ]);
        Product::create([
            'name' => "Kirklans Signature",
            'species' => 'dog',
            'type' => 'food',
            'flavor' => 'Turkey',
            'form' => 'Granule',
            'description' => "Supplemented With Antioxidants And Omega Fatty Acid Nutrition. This Formula Offers Great Nutrition For Overall Health And Vitality For All Dogs. Probiotics And Prebiotics Help Support Healthy Digestive And Immune System.",
            'price' => 66.70,
            'image_url' => "products/dog/food/kirklans-signature.jpg"
        ]);
        Product::create([
            'name' => 'Open Farm',
            'species' => 'dog',
            'type' => 'food',
            'flavor' => 'Grains',
            'form' => 'Pellet',
            'description' => "Our recipes include are made with prime cuts of real meat raised in audited high-welfare family farms without growth hormones. Our meat is raised responsibly so you can feel good about the food you put your dog’s bowl. Open Farm's Ancient Grain Dry Dog Food formula is loaded with meaty animal protein, whole ancient grains, and fresh locally sourced produce without antibiotics, GMOs, artificial flavors, colors, or preservatives.",
            'price' => 26.99,
            'image_url' => 'products/dog/food/open-farm.jpg'
        ]);
        Product::create([
            'name' => "Purina One",
            'species' => 'dog',
            'type' => 'food',
            'flavor' => 'High Protein Beef & Salmon',
            'form' => 'Kibble',
            'description' => "Real beef is the number 1 ingredient in this high protein dog food which supplies 32 percent protein for strong muscles, including a healthy heart. Purina ONE natural dog food with added vitamins, minerals, and nutrients crafted by a veterinarian-recommended brand in Purina-owned, U.S. facilities.",
            'price' => 48.60,
            'image_url' => "products/dog/food/purina-one.jpg"
        ]);
        Product::create([
            'name' => 'Bedsure',
            'species' => 'dog',
            'type' => 'bed',
            'dimensions' => '28"L x 23"W x 6.5"Th',
            'material' => 'Polyester, Polyurethane foam',
            'description' => 'Our orthopedic dog sofa is designed to give your pet unparalleled support for a deep, dreamy sleep. High-density egg-crate foam helps distribute weight evenly and provides the perfect amount of pressure relief and joint support.',
            'price' => 39.99,
            'image_url' => 'products/dog/bed/bedsure.jpg'
        ]);
        Product::create([
            'name' => 'Western Home WH',
            'species' => 'dog',
            'type' => 'bed',
            'dimensions' => '20"L x 20"W x 8"Th',
            'material' => 'Cotton',
            'description' => 'The pet calming dog bed is made of durable luxurious faux fur. The interior is filled with super-soft environmentally friendly PP cotton. It has always provided soft support for the pet, which relieves the pet muscle and joint pain.',
            'price' => 25.99,
            'image_url' => 'products/dog/bed/western-home.jpg'
        ]);
        Product::create([
            'name' => 'Yurika',
            'species' => 'dog',
            'type' => 'bed',
            'dimensions' => '45"L x 35"W x 7.5"Th',
            'material' => 'Suede',
            'description' => 'The filling material of the pillows are made in memory foam. The memory foam dog bed bolster contours for greater support. Yiruka pet bed create the perfect pillow for your pet or the perfect corner for squishing into. Tips: The Bolster can be separated from the bed.',
            'price' => 59.99,
            'image_url' => 'products/dog/bed/yiruka.jpg'
        ]);
        Product::create([
            'name' => 'Bailary',
            'species' => 'dog',
            'type' => 'bed',
            'dimensions' => '28"L x 23"W x 6.5"Th',
            'material' => 'Foam',
            'description' => 'The high-density egg crate foam dog bed is breathable and good resilience, dog bed is provides the perfect amount of softness and support (doesn’t go flat) and helps to soothe the aching joints for pets of all ages.',
            'price' => 39.99,
            'image_url' => 'products/dog/bed/bailary.jpg'
        ]);
        Product::create([
            'name' => "Comfort Expression",
            'species' => 'dog',
            'type' => 'bed',
            'dimensions' => '42"L x 30"W x 9"Th',
            'material' => 'Polyester',
            'description' => "4 inch high 28D egg sponge large dog beds, the sponge is soft and elastic, can support the dog's joints and muscles evenly, especially suitable for older dogs with anxiety and large dogs with arthritis. The classic padded dog cushion offers high loft orthopedic padding as well as a super cozy nesting and digging for dogs and cats.",
            'price' => 58.99,
            'image_url' => "products/dog/bed/comfort-expression.jpg"
        ]);
        Product::create([
            'name' => 'comesoon',
            'species' => 'dog',
            'type' => 'bowl',
            'material' => 'Stainless Steel, Acrylonitrile Butadiene Styrene',
            'description' => 'Our raised dog food bowls not only help the dogs eat more ergonomically, protecting their necks and spines while relieving pressure on their joints, but also promote healthier digestion. This is an essential item, particularly for dogs who tend to vomit while eating, have mobility issues, or suffer from arthritis. The rounded corners of the bowl stand also help prevent accidental bumps or injuries. (Much safe and healthy dog bowls for medium large dogs.',
            'price' => 27.99,
            'image_url' => 'products/dog/bowl/comesoon.jpg'
        ]);
        Product::create([
            'name' => 'Epetslove',
            'species' => 'dog',
            'type' => 'bowl',
            'material' => 'Plastic',
            'description' => 'High-quality stainless steel is anti-corrosion, and heat resistant. The stainless steel bowl is durable for long-term use and healthy for your beloved pets especially for holding hot food. The resin mat features 4 skid-proof rubber at the bottom to prevent the dog bowls from sliding when your pet eating and provides protection for your floors.',
            'price' => 14.99,
            'image_url' => 'products/dog/bowl/epetslove.jpg'
        ]);
        Product::create([
            'name' => "Hubulk",
            'species' => 'dog',
            'type' => 'bowl',
            'material' => 'Stainless Steel, Silicone',
            'description' => "Our dog bowls are made of food grade stainless steel and BPA Free silicone mat, This is a fantastic dog cat puppy food and water dish to prevent messy eating and drinking! Handy all in one feeder for messy pups, new puppy or Small Medium Large dogs.",
            'price' => 9.99,
            'image_url' => "products/dog/bowl/hubulk.jpg"
        ]);
        Product::create([
            'name' => 'Juqiboom',
            'species' => 'dog',
            'type' => 'bowl',
            'material' => 'Stainless Steel',
            'description' => 'High quality stainless steel material bowl, polished to a mirror sheen, no rust, corrosion and oxidation resistance, healthier for your pet. The unique design makes your pets love it more. By widening the bottom of the design, the bowl will be more stable to ensure that it cannot be poured.',
            'price' => 9.97,
            'image_url' => 'products/dog/bowl/juqiboom.jpg'
        ]);
        Product::create([
            'name' => "Spunkyjunky",
            'species' => 'dog',
            'type' => 'bowl',
            'material' => 'Wood, Ceramic, Bamboo',
            'description' => '1.7 cups(400ml, 13.5 Fluid Ounces) capacity of each single bowl, perfect for different breeds of kittens and adult cats, as well as small dogs! Loaded by food grade lead-free handmade ceramic bowls for safer use. free of lead and cadmium. High temperature ceramic,non-toxic harmless,no smell,durable.',
            'price' => 28.99,
            'image_url' => "products/dog/bowl/spunkyjunky.jpg"
        ]);
    }
}
