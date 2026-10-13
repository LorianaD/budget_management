import { currentUser } from "@/data/private/mocks";
import { mockRequest } from "../mockRequest";

// Same read signature as userApi
export const getCurrentUser = (options) =>
    mockRequest(() => currentUser, options);
