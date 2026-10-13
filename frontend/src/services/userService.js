import { userApi } from "@/services/api";
import { selectSource } from "@/services/config";
import { mapUser } from "@/services/mappers";
import { userMock } from "@/services/mocks";

const source = selectSource({ api: userApi, mock: userMock });

export async function getCurrentUser(options) {
    return mapUser(await source.getCurrentUser(options));
}
