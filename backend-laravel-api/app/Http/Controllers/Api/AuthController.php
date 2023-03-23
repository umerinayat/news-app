<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{   
    // Register User
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        /** @var User $user */
        $user = User::create([
            'name'  => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main-app-token')->plainTextToken;

        return response()->json(compact('token', 'user'), 201);
    }

    // Login User
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(!Auth::attempt($credentials))
        {
            return response()->json([
                'message' => 'Invalid Email or Password.'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main-app-token')->plainTextToken;

        return response()->json(compact('token', 'user'), 200);
    }

    // Logout User
    public function logout(Request $request)
    {   
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        
        return response()->json([], 204);
    }
}
