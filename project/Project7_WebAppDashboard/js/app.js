$(document).ready(function() {

  const close = $(".close"); // close btn in alert
  const bell = $(".bellIcon");
  const alertListAll = $(".alertItems");
  const searchInput = $("#searchInput");
  const send = $("#send");
  const save = $("#save");
  let switch1 = true;
  let switch2 = true;

  // retrieve saved data from localStorage
  if(localStorage.length===1){

    const jsonObj = localStorage.getItem('Key');
    const jsObj = JSON.parse(jsonObj);
    const savedTimezone = jsObj.timezone;
    const email = jsObj.email;
    const profile = jsObj.profile;
    $("#timezone").val(savedTimezone); //to be selected

    console.log("email is "+email);
    console.log("profile is "+profile);
    if(!email){
      $("#switchNotification").prop("checked",false);
    }

    if(!profile){
      $("#switchProfile").prop("checked",false);
    }

}
  // delete alerts
  close.on('click',(e)=>{
    e.preventDefault();
    const alert = e.target;
    const alertItems = $(alert).parent(".alertItems");
    $(alertItems).css("display", "none");

  });
  // clicking bellIcon displays notifications
  bell.on('click',(e)=>{
    e.preventDefault();
    if ($(alertListAll).css("display", "none")) {
      $(alertListAll).css("display", "flex");
      $(".bellAlert").css("display","none");
    }

  });

  //search users autocomplete
  searchInput.keyup((e)=>{
    e.preventDefault();
    const users = ["VICTORIA CHAMBERS", "DALE BYRD", "DAWN WOOD", "DAN OLIVER"];

    $("#searchInput").autocomplete({
      source: users,
    });

  });

  //send btn alert
  send.click((e) => {

    e.preventDefault();

    const search = searchInput.val();
    const textarea = $("#messageUser").val();

    if (search === "" || textarea === "") {
      alert("User and message are required");
    }else{
      alert("Message has been sent.");
    }

  });

// to track switch
  $("#switch1").click((e) => {
    switch1=!switch1;
  });
  $("#switch2").click((e) => {
    switch2=!switch2;
  });

  //save btn message and manipulate localStorage
  save.click((e) => {
    e.preventDefault();
    const selectedTimezone = $("#timezone option:selected").val();

    if(selectedTimezone==="Select Timezone"){
      alert("Please select Timezone.");
    }else{
      let obj = {
        email: switch1,
        profile: switch2,
        timezone: selectedTimezone
      };

      obj = JSON.stringify(obj);
      localStorage.setItem('Key',obj);

      alert("It's been saved.");
    }

  });


}); //document
