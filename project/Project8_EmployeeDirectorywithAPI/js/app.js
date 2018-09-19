  // connect to API and fetch data
  const connectToAPIs = () => {
    fetch('https://randomuser.me/api/?results=12&nat=us,au,br,ca,us,nz')
    .then(response => response.json())
    .then(data => {
      createEmployee(data.results);
      searchEmp();
      modalDisplay();
  })
};

  // to create html elements for employee by using data from API
  const createEmployee = (empArr) =>{
    let empHTML = '';
    empArr.forEach( emp => {
    const name = emp.name.first+' '+emp.name.last;
    // capitalize first letter of firstname and lastname
    const empName = name.split(' ').map(word => {
      return word[0].toUpperCase() + word.substr(1);
    }).join(' ');

    empHTML += `  <div class="employee">
                    <img src="${emp.picture.medium}" alt="${empName}" class="img">
                    <div class="right">
                      <h3 class="name">${empName}</h3>
                      <p class="email">${emp.email}</p>
                      <p class="place">${emp.location.city}</p>
                    </div>
                  </div>
                  <div class="modalContainer">

                    <span class="prev span">&larr;</span>
                    <div class="modalContent">
                      <span class="close span">&times;</span>
                      <img src="${emp.picture.medium}" alt="${empName}" class="img">
                      <h3 class="nameModal">${empName}</h3>
                      <p class="emailModal">${emp.email}</p>
                      <p class="placeModal">${emp.location.city}</p>
                      <hr>
                      <p class="cell">${emp.cell}</p>
                      <p class="address">${emp.location.street},${emp.location.state},${emp.location.postcode}</p>
                      <p class="birthday">Birthday: ${emp.dob.date.slice(5,7)}/${emp.dob.date.slice(8,10)}/${emp.dob.date.slice(0,4)}</p>
                    </div>
                    <span class="next span">&rarr;</span>

                  </div>`;
  });
  document.getElementById('directory').innerHTML = empHTML;
}

  // when a user types something in search input
  const searchEmp = () => {

    const search = document.getElementById('search');

    search.addEventListener('keyup',(event)=>{
    event.preventDefault();

    // get employee's name from objects
    const name = document.getElementsByClassName('name');
    const empArrForSearch = Object.keys(name).map((val,index) => {
      return name[index].innerHTML.toUpperCase();
    });

    // search function
    const searchedWord = search.value.toUpperCase();
    const emp = document.getElementsByClassName('employee');
    empArrForSearch.forEach((val,index)=>{

      if( val.indexOf(searchedWord) > -1 ){
        emp[index].style.display = 'flex';
      }else{
        emp[index].style.display = 'none';
      }

    });

  });
}

  // when a user clicks employee
  const modalDisplay = () => {

    // variables for click event trigger
    const employee = document.getElementsByClassName('employee');
    const close = document.getElementsByClassName('close');
    const modal = document.getElementsByClassName('modalContainer');
    const prev = document.getElementsByClassName('prev');
    const next = document.getElementsByClassName('next');

    // ------------------------- function for DRY ---------------------------
    const displayModal = ele => {
      ele.style.display="flex";
      ele.style.flexDirection="row";
      ele.style.alignItems="center";
      ele.style.justifyContent="space-evenly";
    };

    const displayNone = ele => ele.style.display="none";
    // ------------------------- function for DRY ---------------------------


    Object.keys(employee).forEach((val,index)=>{

      const selector = modal[index];
      //display modal for each employee
      employee[index].addEventListener('click',e => {
        e.preventDefault();
        displayModal(selector);
      });

      // close btn to close modal when it's clicked
      close[index].addEventListener('click', e =>{
        e.preventDefault();
        displayNone(selector);
      });

      // modalContainer to close modal when it's clicked
      modal[index].addEventListener('click', e =>{
        e.preventDefault();
        displayNone(selector);
      });

      // variables for prev btn and next btn
      const lastSelector = modal[modal.length-1];
      const firstSelector = modal[0];
      const prevSelector = modal[index-1];
      const nextvSelector = modal[index+1];

      // to display preveous employee modal when it's clicked
      prev[index].addEventListener('click', e =>{
        e.preventDefault();

        if(index!==0){
          displayNone(selector);
          displayModal(prevSelector)
        }else{
          displayNone(selector);
          displayModal(lastSelector);
        }
      }); //prev btn


      // to display next employee modal when it's clicked
      next[index].addEventListener('click', e =>{
        e.preventDefault();

        if(index===modal.length-1){
          displayNone(lastSelector);
          displayModal(firstSelector);
        }else{
          displayNone(selector);
          displayModal(nextvSelector);
        }

      }); //next btn

    }); //forEach method

  } //modalDisplay

  connectToAPIs();
