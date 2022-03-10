
import { APIRoute } from 'next-s3-upload';
import { v4 as uuidv4 } from 'uuid';

export default APIRoute.configure({
  key(req, filename) {
    return `lottie/${uuidv4()}${filename}`;
  },
});