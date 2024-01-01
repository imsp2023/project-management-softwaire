let _uuid = {
    generate: () =>{
        return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) + 
        Math.random().toString(70).substring(3, 20);
    }
}