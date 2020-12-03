import { IconProps } from '@expo/vector-icons/build/createIconSet';
import fetch from 'node-fetch';
import { baseUrl } from '../constants/Config';
import {IProjectType} from '../screens/NewProjectScreen'

export default async (newProject:IProjectType,accessToken:string)=> {
    if(!accessToken) {
        return undefined;
    }
    const npReq = await fetch(`${baseUrl}/v1/project/new`,{
        method:"POST",
        headers:{
            'authorization':`Bearer ${accessToken}`,
            'Content-Type':`application/json`
        },
        body: JSON.stringify(newProject)
    })
    const npRes = await npReq.json();
    return npRes;
}