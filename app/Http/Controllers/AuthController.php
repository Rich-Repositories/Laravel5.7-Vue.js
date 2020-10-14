<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Notifications\SignupActivate;
use Illuminate\Support\Facades\Route;

class AuthController extends Controller
{
    const REFRESH_TOKEN = 'refreshToken';


    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = new User([
            'name' => strtolower("{$request->firstName}.{$request->lastName}"),
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'activation_token' => str_random(60),
        ]);

        $user->save();

        $user->notify(new SignupActivate());

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function signupActivate($token)
    {
        $user = User::where('activation_token', $token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'This activation token is invalid.'
            ], 404);
        }
        $user->active = true;
        $user->activation_token = '';
        $user->save();
        return $user;
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $email = $request->get('email');
        $password = $request->get('password');

        $user = User::where('email', $email)
            ->where('active', 1)
            ->first();

        if (is_null($user))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $oauthClient = DB::table('oauth_clients')->select('id', 'secret')->where('id', 2)->first();

        $request->instance()->request->add([
            'username' => $user->email,
            'password' => $password,
            'grant_type' => 'password',
            'client_id' => $oauthClient->id,
            'client_secret' => $oauthClient->secret,
        ]);

        $proxyRequest = Request::create(env('APP_URL') . '/oauth/token', 'POST');
        $response = Route::dispatch($proxyRequest);
        
        if (!$response->isSuccessful()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $responseContent = json_decode($response->getContent());

        return response()->json([
                'access_token' => $responseContent->access_token,
                'token_type' => 'Bearer',
                'expires_at' => now('europe/athens')->addSeconds($responseContent->expires_in)->toDateTimeString()
            ])->cookie(
            self::REFRESH_TOKEN,
            $responseContent->refresh_token,
            864000, // 10 days
            null,
            null,
            false,
            true // HttpOnly
        );
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
