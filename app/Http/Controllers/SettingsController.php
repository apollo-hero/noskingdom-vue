<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\QueryException;

class SettingsController extends Controller
{
    //
    public function changeEmail(Request $request){
        $new_email = $request->email;
        $password = $request->password;

        $check_password = Account::where('Id', session()->get('USER_ID'))
                                 ->where('Password', hash('sha512', $password))
                                 ->first();
        if(!$check_password){
            $res['status'] = "error";
            $res['message'] = "Incorrect Password!";
            return response()->json($res, 200);
        }
        
        $check_user = Account::where('Email', $new_email)
                                 ->get();
    
            if(count($check_user) > 0){
                $res['status'] = "error";
                $res['message'] = "The email already exist!";
                return response()->json($res, 200);
            } else {
                $user = DB::table('accounts.accounts')
                          ->where('Id', session()->get('USER_ID'))
                          ->update([
                            'Email' => $new_email,
                        ]);
                
                if($user){
                    $user = Account::where('Id', session()->get('USER_ID'))->first();
                    $res['status'] = "success";
                    $res['message'] = "The email changed successfully!";
                    $res['user'] = $user;
                    return response()->json($res, 200);
                } else {
                    $res['status'] = "error";
                    $res['message'] = "The email change failed!";
                    return response()->json($res, 200);
                }

                
            }
    }

    public function changePassword(Request $request){
        $new_password = $request->new_password;
        $old_password = $request->old_password;
        $confirm_password = $request->confirm_password;

        $check_password = Account::where('Id', session()->get('USER_ID'))
                                 ->where('Password', hash('sha512', $old_password))
                                 ->first();

        if(!$check_password){
            $res['status'] = "error";
            $res['message'] = "wrong password";
            return response()->json($res, 200);
        }

        if($new_password != $confirm_password){
            $res['status'] = "error";
            $res['message'] = "confirm password not matched";
            return response()->json($res, 200);
        }

        $update = DB::table('accounts.accounts')
                          ->where('Id', session()->get('USER_ID'))
                          ->update([
                            'Password' => hash('sha512', $new_password),
                        ]);
                
        if($update){
            $user = Account::where('Id', session()->get('USER_ID'))->first();
            $res['status'] = "success";
            $res['message'] = "The password changed successfully!";
            $res['user'] = $user;
            return response()->json($res, 200);
        } else {
            $res['status'] = "error";
            $res['message'] = "The password change failed!";
            return response()->json($res, 200);
        }
    }

    public function getLinks(Request $request){
        $links = DB::table('web.control')->first();
        $download_64 = $links->site_download_launch;
        $download_86 = $links->site_download_client;
        $res['status'] = "success";
        $res['download_64'] = $download_64;
        $res['download_86'] = $download_86;

        return response()->json($res, 200);
    }

    public function getDiscordLink(Request $request){
        $links = DB::table('web.control')->first();
        $discord_link = $links->site_link_support;
        $res['status'] = "success";
        $res['discordLink'] = $discord_link;

        return response()->json($res, 200);
    }
}
