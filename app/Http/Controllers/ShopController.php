<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\QueryException;

class ShopController extends Controller
{
    public function getCategories(Request $request){
        $categories = DB::table('web.categoriesshop')->where('visibility', 1)->orderBy('categoriesid', 'asc')->get();
        $res['status'] = "success";
        $res['categories'] = $categories;
        return response()->json($res,200);
    }

    public function getShopItems(Request $request){
        $perPage = $request->query('per_page', 20);
        $shopItems = DB::table('web.shopitems')
                        ->where('visibility', 1)
                        ->orderBy('number_p')
                        ->get();
        $res['status'] = "success";
        $res['shopItems'] = $shopItems;
        return response()->json($res,200);
    }

    public function getCharacters(Request $request) {
        $characters = DB::table('characters.characters')->where('AccountId', session()->get('USER_ID'))
                                                        ->where('DeletedAt', null)
                                                        ->get();
        $res['characters'] = $characters;
        $res['status'] = "success";
        
        return response()->json($res, 200);
    }
}
