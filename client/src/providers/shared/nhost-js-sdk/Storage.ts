import axios, { AxiosInstance } from "axios";
import * as types from "./types";
import JWTMemory from "./JWTMemory";
import {
  StringFormat,
  base64Bytes,
  utf8Bytes,
  percentEncodedBytes,
} from "./utils";
import Blob from "blob";

export default class Storage {
  private http_client: AxiosInstance;
  private JWTMemory: JWTMemory;
  private use_cookies: boolean;

  constructor(config: types.StorageConfig, JWTMemory: JWTMemory) {
    this.JWTMemory = JWTMemory;
    this.use_cookies = config.use_cookies;

    this.http_client = axios.create({
      baseURL: config.base_url,
      timeout: 120 * 1000, // milliseconds
      withCredentials: this.use_cookies,
    });
  }

  private generateAuthorizationHeader(): null | types.Headers {
    if (this.use_cookies) return null;

    const jwt_token = this.JWTMemory.getJWT();

    if (jwt_token) {
      return {
        Authorization: `Bearer ${jwt_token}`,
      };
    } else {
      return null;
    }
  }

  async put(
    path: string,
    file: File,
    metadata: object | null = null,
    onUploadProgress: any | undefined = undefined
  ) {
    let form_data = new FormData();
    form_data.append("file", file);

    // todo: handle metadata
    if (metadata !== null) {
      console.warn("Metadata is not yet handled in this NHOST JS SDK.");
    }

    const upload_res = await this.http_client.post(
      `/storage/o${path}`,
      form_data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.generateAuthorizationHeader(),
        },
        onUploadProgress,
      }
    );

    return upload_res.data;
  }

  async putString(
    path: string,
    data: string,
    type: StringFormat = "raw",
    metadata: any = null,
    onUploadProgress: any | undefined = undefined
  ) {
    // todo: handle metadata
    // if (metadata !== null) {
    //   console.warn("Metadata is not yet handled in this NHOST JS SDK.");
    // }

    let file;
    if (type === "raw") {
      const fileData = utf8Bytes(data);
      const contentType =
        metadata && metadata.hasOwnProperty("content-type")
          ? metadata["content-type"]
          : null;
      file = new Blob([fileData], { type: contentType });
    } else if (type === "data_url") {
      let isBase64 = false;
      let contentType: string | undefined = undefined;

      const matches = data.match(/^data:([^,]+)?,/);
      if (matches === null) {
        throw "Data must be formatted 'data:[<mediatype>][;base64],<data>";
      }

      const middle = matches[1] || null;
      if (middle != null) {
        isBase64 = middle.endsWith(";base64");
        contentType = isBase64
          ? middle.substring(0, middle.length - ";base64".length)
          : middle;
      }

      const restData = data.substring(data.indexOf(",") + 1);

      const fileData = isBase64
        ? base64Bytes(StringFormat.BASE64, restData)
        : percentEncodedBytes(restData);

      file = new Blob([fileData], { type: contentType });
    }

    // create fil from message

    // create form data
    let form_data = new FormData();
    form_data.append("file", file);

    const upload_res = await this.http_client.post(
      `/storage/o${path}`,
      form_data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.generateAuthorizationHeader(),
        },
        onUploadProgress,
      }
    );

    return upload_res.data;
  }

  async delete(path: string) {
    const upload_res = await this.http_client.delete(`storage/o${path}`, {
      headers: {
        ...this.generateAuthorizationHeader(),
      },
    });
    return upload_res.data;
  }

  async getMetadata(path: string): Promise<object> {
    const res = await this.http_client.get(`storage/m${path}`, {
      headers: {
        ...this.generateAuthorizationHeader(),
      },
    });
    return res.data;
  }
}
