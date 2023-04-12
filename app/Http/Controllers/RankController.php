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
        $characters = DB::table('characters.characters')->paginate($size);
        $last_page = $characters->lastPage();

        $level_rank = DB::table('characters.characters')
                        ->offset(($page-1)*$size)
                        ->limit($size)
                        ->orderBy('Level','desc')
                        ->get();

        echo json_encode(["data"=>$level_rank,"last_page"=>$last_page]);

    }

    public function getRankHero (Request $request){
        $page = $request->page;
        $size = $request->size;
        $characters = DB::table('characters.characters')->paginate($size);
        $last_page = $characters->lastPage();

        $level_rank = DB::table('characters.characters')
                        ->offset(($page-1)*$size)
                        ->limit($size)
                        ->orderBy('HeroLevel','desc')
                        ->get();

        echo json_encode(["data"=>$level_rank,"last_page"=>$last_page]);

    }

    public function getRankReput (Request $request){
        $page = $request->page;
        $size = $request->size;
        $characters = DB::table('characters.characters')->paginate($size);
        $last_page = $characters->lastPage();

        $level_rank = DB::table('characters.characters')
                        ->offset(($page-1)*$size)
                        ->limit($size)
                        ->orderBy('Reput','desc')
                        ->get();

        echo json_encode(["data"=>$level_rank,"last_page"=>$last_page]);

    }
}
