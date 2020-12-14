export default (form,data) => {
  for(let i=0;i<form.attributes.options.length;i++){
    if(data[form.key] == form.attributes.options[i].value){
      data[form.key] = form.attributes.options[i].label;
      break;
    }
  }
  return data
}
