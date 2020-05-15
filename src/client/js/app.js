import  {handleSubmit} from "./handleSubmit";

const plan_now = document.getElementById('plan_now').addEventListener('click', function (e) {
    document.getElementById('trip_details_form').reset();
    plan_trip.scrollIntoView({behavior: "smooth"});
});

const remove_trip = document.getElementById('remove_trip').addEventListener('click', function (e) {
    document.getElementById('trip_details_form').reset();
    trip_details_section.classList.add('invisible');
    location.reload();
});

document.getElementById("travel_details_submit").addEventListener("click", handleSubmit);

export {
    plan_now,
    remove_trip,
}