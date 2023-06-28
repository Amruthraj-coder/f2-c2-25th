
let data=[];

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
.then((response)=>response.json())
.then((datav)=>{
     data=datav;
    //  console.log(data)
     rendertable(data);
})
.catch(error => {
    console.error("error is :",error)
})


function rendertable(data){
    const tablecontainer = document.getElementById("table-container");
    tablecontainer.innerHTML="";
    data.forEach((item) => {
        
        
        let row=document.createElement("tr");
        // row.innerHTML="";
        const percentageChange=item.price_change_percentage_24h;
        const percentageChangeClass = percentageChange >= 0 ? 'positive-change' : 'negative-change';
        

        row.innerHTML=`<td><img width="30px"; height="30px" src="${item.image}"></td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>${item.id}</td>
        <td>${"$"+item.current_price}</td>
        <td class="${percentageChangeClass}">${item.price_change_percentage_24h}%</td>
        <td>${"Mkt Cap : $"+item.total_volume}</td>
                        `
        // console.log(row)
        tablecontainer.appendChild(row);
    })
}

const searchElement =document.getElementById("searchhere");

searchElement.addEventListener("keyup",()=>{
let searchedvalue=searchElement.value;
let newdata=data.filter((element)=>{
 return (element.name).includes(searchedvalue)||(element.symbol).includes(searchedvalue)
 
})
rendertable(newdata);

// if()
})


const MKTbutton=document.getElementById("sortByMKT");

MKTbutton.addEventListener("click",()=>{
    // let mktarr=[];
   let mktarr=data.map((element)=>{
        return element
    })
    mktarr.sort((a,b)=> a.total_volume-b.total_volume)
    // console.log(mktarr)
    rendertable(mktarr);
})

const percentbutton=document.getElementById("percentageButton");

percentbutton.addEventListener("click",()=>{
    
    data.sort((a,b)=> a.price_change_percentage_24h-b.price_change_percentage_24h);
    rendertable(data);
})