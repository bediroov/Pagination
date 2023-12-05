import axios from 'axios';
import React, { useEffect, useState } from 'react'


const renderdata = (event) => {               // datalari asagida cagirmag ucun ayri funksiya
  return (
    <div className="row">
      {event.map((item, i) => {

        return (
          <div key={i} className="col-12 col-md-3 g-5"><img width={300} height={300} src={item.image} alt="" /></div>
        )

      })}
    </div>
  )
}

const Pagination = () => {
  
  const [data, setData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);       // hal-hazirdaki sehive
  const [itemsperpage, setItemsperpage] = useState(2);  //her sehivedeki cardlarin sayidir 

  const indexoflastitem = currentpage * itemsperpage // meselen 12ci inddex ucun 3cu sehive * 4 

  const indexoffirstitem = indexoflastitem - itemsperpage //12-4  3 cu sehivede ilk element menasini verecek

  const currentitems = data.slice(indexoffirstitem, indexoflastitem);         //gorunenn cardlardir

  // Math.ceil(data.length/itemsperpage)   umumi datalara gore butonlarin sayini texmini gotrur.

  const handleClick = (a) => {
    setCurrentpage(a);
  }

  const pagebuttons = [];   // buttonlarimi saxlayan arraydi 

  for (let i = 0; i < Math.ceil(data.length / itemsperpage); i++) {

    const page = i + 1;  // her novbeti sehivedir 

  

    if (currentpage == page + 1 || currentpage == page - 1 || currentpage == page + 2 || currentpage == page - 2 || page == 1 || page == Math.ceil(data.length / itemsperpage) || currentpage == page) {
      pagebuttons.push(page)
    }
    else{
      // if(pagebuttons[i].props.className  != pagebuttons[i-1].props.className){

      pagebuttons.push(null)
    // }

    }
   
  }



  const handleprevclick = () => {                   //evvele 
    if (currentpage !== 1) {
      setCurrentpage(currentpage - 1)
    }
  }

  const handlenextclick = () => {
    if (!(currentpage >= Math.ceil(data.length / itemsperpage))) {         //novbeti
      setCurrentpage(currentpage + 1)
    }
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        // console.log(res);
        setData(res.data)
        console.log(res.data);
        setLoading(false)
      })
      .catch(res => {
        setLoading(false)
        setError(true);
      })
  }, [])

  return (
    <>
      <div>
        <h1 className='text-center'>Pagination</h1>
        <div className="container">
          <div className="row">
            {
              loading
                ?
                <h2 className='text-center py-2 my-2 bg-success text-white'>Loading</h2>
                :

                error ?
                  <h2 className='text-center py-2 my-2 bg-danger text-white'>Server islemir</h2>

                  :

                  data.length == 0 ?
                    <h2>Məhsul yoxdur !!</h2>

                    :

                    renderdata(currentitems)
            }
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="container">
          <button
            onClick={() => handleprevclick()}
            className='btn btn-danger ms-2 mt-2'>Previous </button>
          {console.log(pagebuttons,"buttons")}
          {
            pagebuttons.map((item,c)=>{
              if( item == null){

                if( pagebuttons[c-1] != pagebuttons[c]){
                  return(
                      <button key={c}
                        className={`btn ms-2 mt-2 ${currentpage == item ? "btn-warning" : "btn-primary"}`}
                        // onClick={() => handleClick(item)}
                      >...</button>
                )

                
              }

              }else{
                return(
                    <button key={c}
                      className={`btn ms-2 mt-2 ${currentpage == item ? "btn-warning" : "btn-primary"}`}
                      onClick={() => handleClick(item)}
                    >{item}</button>
                )
              }
            })
          }
          <button onClick={() => handlenextclick()} className='btn btn-success ms-2 mt-2'>Next</button>
        </div>
      </div>
    </>
  )
}

export default Pagination