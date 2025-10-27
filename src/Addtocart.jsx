import React, { useState } from 'react'

function Addtocart() {

    const [id, SetId] = useState("")
    const [title, SetTitle] = useState()
    const [price, SetPrice] = useState()
    const [image, SetImage] = useState()

    const upload = async() => {
      let res=await  fetch('http://localhost:8080/user', {
            method: 'POST',                     // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title:title,
                price:price,
                image:image
            })
        })

        if(res.ok){
            alert("product added")
        }else{
            alert("eroor")
        }
    }

    return (
        <div className="w-[100%] h-[100vh] bg-emerald-600 flex justify-center items-center">

            <div className="w-[80%] md:w-[50%] lg:w-[30%] h-[80%] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                <input type="text" placeholder='id' className='w-[80%] h-[3rem] border-1 border-black rounded-xl py-1.5 px-3 ' onChange={e => SetId(e.target.value)} /> <br />
                <input type="text" placeholder="title :" className='w-[80%] h-[3rem] border-1 border-black rounded-xl py-1.5 px-3 ' onChange={e => SetTitle(e.target.value)} /> <br />
                <input type="text" placeholder='Price of the product :' className='w-[80%] h-[3rem] border-1 border-black rounded-xl py-1.5 px-3' onChange={e => SetPrice(e.target.value)} /> <br />
                <textarea name="image" placeholder='Add image:' className='w-[80%] h-[3rem] border-1 border-black rounded-xl py-1.5 px-3' onChange={e => SetImage(e.target.value)}>
                </textarea>
                <br />
                <button onClick={upload} className='hover:bg-blue-400 cursor-pointer transition rounded-xl py-=4 px-8npm r w-[20%] h-[5vh]' >ADD</button>

                <div>
                  
                </div>
            </div>

        </div>
    )
}

export default Addtocart