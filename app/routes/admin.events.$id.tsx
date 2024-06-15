import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import Events from "~/modal/events";

export const loader:LoaderFunction = async ({request,params}) => {
    const session = await getSession(request.headers.get("Cookie"))
    const token = session.get("email")
    if(!token){
        return redirect("/login")
    }

    const {id} = params;
    console.log(id);
    
    const delet = await Events.findByIdAndDelete(id)
    if(delet){
        return redirect("/admin/events")
    }
    
}