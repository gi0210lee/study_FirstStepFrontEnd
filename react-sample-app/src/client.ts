import Axios, { AxiosInstance, AxiosResponse, CancelToken} from 'axios';
import { NavLink } from 'react-router-dom';

// const baseURL = 'https://us-central1-demoapp-1779c.cloudfunctions.net/v1';
const baseURL = 'https://us-central1-fir-firststepfrontend.cloudfunctions.net/v1';

const instance: AxiosInstance = Axios.create({
  baseURL,
  timeout: 10000
});

export interface Message {
  id?: string;
  body?: string;
  user?: {
    id?: string
    name?: string
    avatar?: string    
  };
  date?: string;
}

export const fetchMessages = ( channelName: string
                             , params = {}
                             , cancelToken: CancelToken = null): Promise<AxiosResponse<{ messages: Message[] }>> => {
    return instance.get(`/channels/${channelName}/messages`, {
      params,
      cancelToken
    });
  };


export const postMessage = (channelName: string, payload: Message, cancelToken: CancelToken = null): Promise<AxiosResponse<Message>> => {
  return instance.post(`/channels/${channelName}/messages`, payload, {
    cancelToken
  });
};