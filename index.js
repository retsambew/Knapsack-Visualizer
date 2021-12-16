function start(){
    let p=document.getElementById("profit").value;
    let w=document.getElementById("weight").value;
    let maxw=document.getElementById("maxw").value;
    if(p && w && maxw){
        maxw=parseInt(maxw);
        p=p.split(" ");
        w=w.split(" ");
        for (let i = 0; i < w.length; i++) {
            w[i] = parseInt(w[i]);
            p[i] = parseInt(p[i]);            
        }
        let n=w.length;
        knapsack(n,w,p,maxw);
        setTimeout(() => {
            animate(n,maxw,w)
        }, 1000);
    }
    else{
        alert("Please Fill All Fields!");
    }
}

function knapsack(n, w, p, maxw){
    let dp=new Array(n+1);
    for (let i = 0; i < n+1; i++) {
        dp[i] = new Array(maxw+1);
        dp[i].fill(0);
    }
    for(let i = 1; i < n+1; i++){
        for(let j = 1; j < maxw+1; j++){
            if(w[i-1] <= j){
                dp[i][j] = Math.max(dp[i-1][j], p[i-1] + dp[i-1][j-w[i-1]]);
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }

    createTable(dp, n, maxw);

    let str="Max Profit: "+dp[n][maxw]+" | Included Item ";
    let temp=dp[n][maxw];
    for (let i = n; i > 0; i--){
        if(temp == dp[i-1][maxw]){
            continue;
        }
        else{
            str += i + " ";
            maxw -= w[i-1];
            temp -= p[i-1];
        }
    }

    const data=document.getElementById("data");
    data.removeChild(document.getElementById("ans"));
    let ans = document.createElement("h3");
    let text=document.createTextNode(str);
    ans.id="ans";
    ans.appendChild(text);
    data.appendChild(ans);
}

function createTable(dp, n, maxw){
    const data=document.getElementById("data2");
    if(document.getElementById("table")){
        data.style.opacity=0;
        setTimeout(() => {
            data.removeChild(document.getElementById("table"));
        }, 1000);
    }
    let table=document.createElement("table");
    for (let i = 0; i < n+1; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < maxw+1; j++) {
            const cell = document.createElement("td");
            const val = document.createTextNode(dp[i][j]);
            cell.appendChild(val);
            cell.classList.add("hide");
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    table.id="table";
    setTimeout(() => {
        data.appendChild(table);
        data.style.opacity=1;
    }, 1000);
}

function animate(n,maxw,w){
    let table = document.getElementById("table");
    let speed = parseInt(document.getElementById("speed").value);
    for(let i=0;i<n+1;i++){
        let cell = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
        cell.classList.remove("hide");
    }

    for(let j=0;j<maxw+1;j++){
        let cell = table.getElementsByTagName("tr")[0].getElementsByTagName("td")[j];
        cell.classList.remove("hide");
    }
    for (let i = 1; i < n+1; i++) {
        for (let j = 1; j < maxw+1; j++) {
            if(w[i-1]<=j){
                let currentCell = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                let cell1 = table.getElementsByTagName("tr")[i-1].getElementsByTagName("td")[j];
                let cell2 = table.getElementsByTagName("tr")[i-1].getElementsByTagName("td")[j-w[i-1]];
                setTimeout(() =>{
                    currentCell.classList.add("cola");
                    cell1.classList.add("colb");
                    cell2.classList.add("colb");
                    currentCell.classList.remove("hide");
                }, (speed*(maxw+1)*(i-1))+speed*(j-1));
    
                setTimeout(() =>{
                    currentCell.classList.remove("cola");
                    cell1.classList.remove("colb");
                    cell2.classList.remove("colb");
                }, (speed*(maxw+1)*(i-1))+speed*(j-1) + speed);
            }
            else{
                let currentCell = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                let cell = table.getElementsByTagName("tr")[i-1].getElementsByTagName("td")[j];
                setTimeout(() =>{
                    currentCell.classList.add("cola");
                    cell.classList.add("colb");
                    currentCell.classList.remove("hide");
                }, (speed*(maxw+1)*(i-1))+speed*(j-1));
    
                setTimeout(() =>{
                    currentCell.classList.remove("cola");
                    cell.classList.remove("colb");
                }, (speed*(maxw+1)*(i-1))+speed*(j-1) + speed);
            }
        }
    }
}