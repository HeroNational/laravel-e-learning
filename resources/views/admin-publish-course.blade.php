<x-app-layout>
    <title>{{ config('app.name', 'Laravel') }} | Edit course</title>
    <style>
        #mceu_58{
            display:none!important;
        }
    </style>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Edit course') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 border-b border-gray-200">
                    <form action=""  id="editor" method="POST" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="mt-2">
                            @if ($errors->any())
                                <div class="font-medium text-green-800">
                                    {{ __('Whoops! Something went wrong.') }}
                                </div>

                                <ul class="mt-3 text-sm text-red-600 list-disc list-inside">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            @endif
                            <input type="file" accept="image/jpeg, image/png" name="courseimg" class="hidden w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="courseImg">
                            <label for="courseImg" class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 transition-all duration-200 ease-in-out bg-green-100 border-green-700 rounded shadow-sm hover:text-gray-100 hover:bg-green-600 tborder focus:outline-none focus:border-green-500 " ><span class="ti-camera mr2"></span>&nbsp;&nbsp;Choose a picture image for the lesson</label>
                        
                            <div class="form-group">
                                <label for="">Title</label>
                                <input name="titre" type="text" id="" class="form-control" placeholder="" aria-describedby="helpId">
                            </div>
                            <div class="form-group">
                                <label for="">Description</label>
                                <input type="text" name="descriptif" id="" class="form-control" placeholder="" aria-describedby="helpId">
                            </div>
                            <div class="form-group">
                                <label for="">Objectives</label>
                                <input type="text" name="objectif" id="" class="form-control" placeholder="" aria-describedby="helpId">
                            </div>
                            <div class="form-group">
                                <label for="">Required skills</label>
                                <input type="text" name="competences" id="" class="form-control" placeholder="" aria-describedby="helpId">
                            </div>
                            <div class="row">
                                 <div class="form-group col-sm-6 ">
                                    <label for="">Cost in FCFA</label>
                                    <input type="currency" name="cout" id="" value="0" class="form-control" placeholder="" aria-describedby="helpId">
                                </div>
                                 <div class="form-group col-sm-6 ">
                                    <label for="">Difficulty level on 10</label>
                                    <input type="number" max="10" min="1" required value="1" name="difficulte" id="" class="form-control" placeholder="" aria-describedby="helpId">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="">Category</label>
                                <select class="border btn col-md-12 col-sm-12 col-12">
                                    @forelse ($categories as $categorie)
                                        <option value="{{$categorie->id}}">{{$categorie->nom}}</option>
                                    @empty
                                        
                                    @endforelse
                                </select>
                            </div>
                            <button class="mt-3 text-white bg-green-700 col-md-12 col-sm-12 col-12 btn" type="submit">
                                Submit the course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @include("eclipse-interface.layouts.footer")

</x-app-layout>
{{-- @include("components.footer") --}}
