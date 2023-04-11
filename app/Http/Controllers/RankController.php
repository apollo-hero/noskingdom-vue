<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Charactor;
use Illuminate\Support\Facades\DB;

class RankController extends Controller
{
    public function getRankLevel (Request $request){
        $page = $request->page;
        $size = $request->size;
        
        $level_rank = Charactor::orderBy('Level','desc')->get();

        echo json_encode(["data"=>$level_rank,"last_page"=>5]);

    }
}
