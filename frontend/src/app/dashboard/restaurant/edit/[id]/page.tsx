import React from 'react';
import RestaurantForm from '../../add/form';

const EditRestaurantPage: React.FC = () => {
    return (
       <div className="mx-auto w-full overflow-auto">
         <div className="mt-5 sm:mt-20 px-5 md:px-20 w-full ">
           <h1 className="font-bold text-2xl mb-10 text-center">Edit Restaurant</h1>
           <RestaurantForm action="edit" />
         </div>
       </div>
    );
};

export default EditRestaurantPage;