import React from 'react';

const RestaurantDetails = async ({params}: Readonly<{params: {id:string}}>) => {
    const {id} = await params;
    return (
        <div className='m-auto container'>
            <p>hello</p>
        </div>
    );
};

export default RestaurantDetails;