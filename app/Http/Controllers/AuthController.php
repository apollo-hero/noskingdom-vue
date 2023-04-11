<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        try {
            $username = $request->username;
            $email = $request->email;
            $password = $request->password;
            $confirm_password = $request->confirm_password;

            if($password != $confirm_password){
                $res['status'] = "error";
                $res['message'] = "The password does not match!";
                return response()->json($res, 200);
            }
    
            $check_user = Account::where('Name', $username)
                                 ->orWhere('Email',$email)
                                 ->get();
    
            if(count($check_user) > 0){
                $res['status'] = "error";
                $res['message'] = "The username or email already exist!";
                return response()->json($res, 200);
            } else {

                $user = DB::table('accounts.accounts')->insert([
                    'MasterAccountId' => "00000000-0000-0000-0000-000000000000",
                    'Authority' => config('constants.ROLE_USER'),
                    'Name' => $username,
                    'Email' => $email,
                    'Password' => hash('sha512', $password),
                    'BankMoney' => 0,
                    'Language' => 0,
                    'IsPrimaryAccount' => false,
                    'Coins' => 0,
                    'RegistrationIP' => $_SERVER['REMOTE_ADDR'],
                    'CreatedAt' => DB::raw('CURRENT_TIMESTAMP(0)')
                ]);

                if($user){
                    $res['status'] = "success";
                    $res['message'] = "The new user created successfully!";
                    return response()->json($res, 200);
                } else {
                    $res['status'] = "error";
                    $res['message'] = "The new user create failed!";
                    return response()->json($res, 200);
                }
            }
        } catch (Exception $e) {
                $res['status'] = "error";
                $res['check'] = $e->getMessage();
                return response()->json($res, 200);            
            } catch (QueryException $e) {
                $res['status'] = "error";
                $res['check'] = $e->getMessage();
                return response()->json($res, 200); 
            }
        

    }

    public function login(Request $request){

        $email = $request->email;
        $password = $request->password;

        $user = DB::table('accounts.accounts')
                  ->where('Email', $email)
                  ->where('Password', hash('sha512', $password))
                  ->first();

        if(!$user){
            $res['status'] = "error";
            $res['message'] = "The email and passwordl is not matched!";
            return response()->json($res, 200);
        } else {
            if ($user->Authority < 0){

                if($user->Authority == -1)
                    $MSG = 'ACCOUNT UNCONFIRMED';
                elseif($user->Authority == -2) 
                    $MSG = 'ACCOUNT BANNED';
                elseif($user->Authority == -3)
                    $MSG = 'ACCOUNT CLOSED';

                $res['status'] = "error";
                $res['message'] = $MSG;
                return response()->json($res, 200);
            } else {

                session()->put('USER_ID', $user->Id);
                session()->put('USER_NICK', $user->Name);
                session()->put('USER_EMAIL', $user->Email);
                session()->put('USER_RANGE', $user->Authority);
                session()->put('USER_REG_DATE', $user->CreatedAt);
                

                $res['status'] = "success";
                $res['message'] = "Login success!";
                $res['user'] = $user;
                return response()->json($res, 200);
            }
        }

    }
}
