function Option({item}){
    return(
        <option value={item.id}>{item.name}</option>
    );
}

export default Option;