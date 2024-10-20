import { CorsOptions } from 'cors'
import { ALLOWED_HOSTS } from './constants';
import { EnumHttpMethod } from './enums';

const allowedHosts: string[] = ALLOWED_HOSTS.split(",");

const corsOptions: CorsOptions  = {
  origin: allowedHosts, // List of allowed origins
  methods: [EnumHttpMethod.GET, EnumHttpMethod.POST, EnumHttpMethod.PUT, EnumHttpMethod.DELETE],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Whether or not to allow credentials (e.g., cookies)
};

export default corsOptions;