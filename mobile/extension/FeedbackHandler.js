const FeedbackHandler = (serverURL, time, limit) => {
    
    var Notifications;
    var count = 0;
    Notifications = setInterval(ExtensionNotifications, time);

    async function ExtensionNotifications () {
        count++;
        console.log("Notifications Enabled"); 
        const res = await fetch(`${serverURL}/api/surveys/feedback`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        });

        if(count == limit) clearInterval(Notifications);

        if (res.status == 200){
            // Methods to handle Notification
            console.log("Notifications Disabled"); 
            clearInterval(Notifications);}
        else if (res.status == 400)
            console.log("Feedback Not Received Yet.")
        else
            console.log("ERROR")
    };
}
export default FeedbackHandler;