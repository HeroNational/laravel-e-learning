<title>{{ config('app.name', 'Laravel') }} | User</title>
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Users') }}
        </h2>
    </x-slot>
    <style>
        
        @media print{
            .disappear{
                visibility: hidden!important;
            }
            body{
                height: 97%;
                padding-top: -100px;
                padding-bottom: -800px;
            }
            .show{
                visibility: visible!important;
            }
            .appear{
                position: relative;
                top:10px;
            }
            #magnify{
                width: 100%!important;
                position: relative;
                transform: translateY(20%);
            }
        }
    </style>
    <div class="py-12">
        <div class="mx-auto max-w-7xl ">
            
            <div onclick="print()/*printJS($print_data, 'json')*/" class="mb-2 text-white bg-green-700 btn">Print the table</div>
            <div class="relative overflow-hidden bg-white shadow-sm sm:rounded-lg show" id="printJS-users">
                <div class="border-b border-gray-200 ">
                    <div class="overflow-x-auto">
                        <div class="bg-white rounded shadow-md ">
                            <table class="w-full table-auto min-w appear ">
                                <thead>
                                    <tr class="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
                                        <th class="px-6 py-3 text-left">Name</th>
                                        <th class="px-6 py-3 text-center">Pseudonym</th>
                                        <th class="px-6 py-3 text-left">Email</th>
                                        <th class="px-6 py-3 text-center">Country</th>
                                        <th class="px-6 py-3 text-center">Registared at</th>
                                        <th class="px-6 py-3 text-center disappear">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm font-light text-gray-600">
                                    @forelse ($users as $user)
                                        
                                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="px-6 py-3 text-left whitespace-nowrap">
                                            <div class="flex items-center">
                                                <img src="{{Storage::url($user->avatar)}}" class="w-10 h-10 mr-2 transform border border-gray-200 rounded-full" alt="">
                                                <span class="font-medium">{{$user->nom_utilisateur}}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-3 text-left">
                                            <div class="flex items-center">
                                                <span>{{$user->pseudo}}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-3 ">
                                            <a href="mailto:{{$user->email}}">{{$user->email}}</a>
                                        </td>
                                        <td class="px-6 py-3 text-center">
                                            <span class="px-3 py-1 text-green-700 rounded-full">{{$user->pays}}</span>
                                        </td>
                                        <td class="px-6 py-3 text-center">
                                            <span class="px-3 py-1 text-green-700 rounded-full">{{$user->created_at->format("d-m-Y")}}</span>
                                        </td>
                                        <td class="px-6 py-3 text-center disappear">
                                            <div class="flex justify-center item-center">
                                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </div>
                                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    @empty
                                    <div class="w-full bg-red-600">
                                        Not user found yet.    
                                    </div>    
                                    @endforelse
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <span class="disappear">
        
        @include("eclipse-interface.layouts.footer")

    </span>
</x-app-layout>
    