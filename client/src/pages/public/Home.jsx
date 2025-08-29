import React, {useEffect, useState} from "react";
import { Sidebar, Banner, BestSeller, NewProduct } from "../../components";

const Home = () => {
    return (
        <div className='w-main flex gap-5'>
            <div className='w-[20%] flex flex-col'>
                <Sidebar />
            </div>
            <div className='w-[80%] flex flex-col gap-5'>
                <Banner />
                <BestSeller />
            </div>

        </div>
    );
};

export default Home;
