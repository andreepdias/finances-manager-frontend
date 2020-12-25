declare var $:any;

export class Notification {
    static showNotification(message: string, icon: string, type: string, from: string, align: string){
        $.notify({
            icon: icon,
            message: message
        },{
            type: type,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });   
    }
}