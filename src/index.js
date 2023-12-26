import grpc from '@grpc/grpc-js'
import { UserService } from './proto/authentication_grpc_pb.js'
import user from './authentication/user/user.js';


const api = new grpc.Server();

api.addService(UserService, user)


const PORT = 50051;
api.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    api.start();
});