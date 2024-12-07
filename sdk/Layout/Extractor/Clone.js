class Clone{
    clone(elementID){    
        const father = document.getElementById(elementID);
        const child = father.cloneNode(true);
        father.style.display = 'none';
        return child;
    }
}
export default Clone;