import { User } from 'lucide-react';
import React from 'react'

export default function NoDataFound({ title = "No Users Found", 
    message = "Try adding a new user or check your filters." }){
return (
    <div className="col-span-full text-center p-10 bg-white rounded-xl shadow-md">
      <div className="flex justify-center mb-4">
        <User className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500 mt-2">{message}</p>
    </div>
  );
};
