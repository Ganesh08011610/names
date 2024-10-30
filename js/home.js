

const searchForm = document.getElementById('search_form')

searchForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const formData = new FormData(searchForm) 
    
    const url = `search.html?name=${encodeURIComponent(formData.get('search'))}&selectedLang=${encodeURIComponent(formData.get('names'))}`;
    console.log(url)
    console.log(url);
    
    
  
   
    window.location.href = url;

})





async function apiFecting() {
    try {
      const api = await fetch(
        "http://localhost/api/list_names.php?limit=5&page=1"
      );
      const response = await api.json();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


