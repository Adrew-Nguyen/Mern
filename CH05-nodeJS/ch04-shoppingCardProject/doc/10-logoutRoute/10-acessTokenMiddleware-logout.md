# AcessToken Middleware dành cho logout

# tạo dựng chức năng logout

- `logout` phải là method `post` vì

  - khi logout, người dùng sẽ cung cấp lại
    `at` và `rf` để xác minh họ là ai, sau đó mình sẽ thu hồi (xóa khỏi hệ thống) `rf` của họ

  - vậy nên ta tạo logout với method `post` với
    `header: Authorization: Bear access_token` (dùng để biết account nào muốn logout)
    và body:{refresh_token} (dùng để xóa token trong collection refresh_tokens)

- vậy để logout người dùng sẽ truyền lên access_token và refresh_token, gữi qua route là `users/logout` và xử lý `access_token` bằng 1 middleware như sau:
  - validate access_token (kiểm tra client có gữi lên không, có thể kiểm tra xác thực at ở đây)
  - gán decoded_authorization(json của payload: thông tin người gữi - user_id) vào req : để sau này mình cần biết ai đã gữi req thì mình có xài
- xử lý `refresh_token` middleware như sau:
  - validate refresh_token(có gữi lên hay k, hết thời gian không, có hợp lệ không)
  - gán decoded_authorization và req
- controller sẽ kiểm tra có còn tồn tại trong database không và xóa nó đi
- trả về message logout thành công

- tham khảo luồng xử lý logout ở đây

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FBeECRO014VsTDbyiWkgUyy%2FUntitled%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DjFTd64xLgUqRUEYh-1" allowfullscreen></iframe>

# bắt đầu xử lý

- vào route và thêm `logout`
  ```ts
  /*
    des: lougout
    path: /users/logout
    method: POST
    Header: {Authorization: Bearer <access_token>}
    body: {refresh_token: string}
    */
  usersRouter.post("/logout"); //ta sẽ thêm middleware sau
  ```
- thêm trong `message.ts` các thông báo lỗi
  ```ts
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required'
  ```
- giơ ta tạo middleware đầu tiền giúp validate accesstoken tên là `accessTokenValidator`
  và accessToken chỉ nằm ở Header nên ta sẽ cho checkSchema vào đúng `header` mà thôi
  đồng thời cũng fix lại các validator trên chỉ check `body` mà thôi ngoài ra `checkSchema` còn có thể check riêng các phần khác của req như `'body' | 'cookies' | 'headers' | 'params' | 'query'`

  ```ts
    export const loginValidator = validate(
        checkSchema(
            {
            ...
            },
            ['body']
        )
    )

    export const registerValidator = validate(
        checkSchema(
            {...
            },
            ['body']
        )
    )

    export const accessTokenValidator = validate(
        checkSchema(
            {
            Authorization: {
                notEmpty: {
                //kiểm tra có gữi lên không
                errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
                },
                custom: {
                //value là giá trị của Authorization, req là req của client gữi lên server
                options: async (value: string, { req }) => {
                    //value của Authorization là chuỗi "Bearer <access_token>"
                    //ta sẽ tách chuỗi đó ra để lấy access_token bằng cách split
                    const access_token = value.split(' ')[1]
                    //nếu nó có truyền lên , mà lại là chuỗi rỗng thì ta sẽ throw error
                    if (!access_token) {
                        //throw new Error(USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED)  //này trả ra 422(k hay)
                       // thì k hay, ta phải trả ra 401(UNAUTHORIZED)
                        throw new ErrorWithStatus({
                            message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                            status: HTTP_STATUS.UNAUTHORIZED
                        })
                    }
                    //nếu có thì kiểm tra xem access_token có hợp lệ hay không
                    //đừng lại đây 1 tý, ta chưa làm hàm verifyToken cho các jwt
                }
                }
            }
            },
            ['headers']
        )
    )
  ```

  - làm verify cho accesstoken bằng hàm có sẵn của [jwt npm](https://www.npmjs.com/package/jsonwebtoken) nhưng ta sẽ chuyển nó thành `promise` cho phù hợp với việc xử lý lỗi dồn về 1 `error handler`
    ![Alt text](image-86.png)

  - vào `jwt.ts` code thêm `verifyToken`

    ```ts
    export const verifyToken = ({
      token,
      secretOrPublicKey = process.env.JWT_SECRET as string,
    }: {
      token: string;
      secretOrPublicKey?: string;
    }) => {
      //trả về JwtPayload(thông tin người gữi req) nếu token hợp lệ
      return new Promise<jwt.JwtPayload>((resolve, reject) => {
        //method này sẽ verify token, nếu token hợp lệ thì nó sẽ trả về payload
        //nếu token không hợp lệ thì nó sẽ throw error
        //secretOrPublicKey dùng để verify token
        //nếu token được tạo ra bằng secret|PublicKey thì ta dùng secret|PublicKey key để verify
        //từ đó biết rằng access_token được tạo bởi chính server
        jwt.verify(token, secretOrPublicKey, (error, decoded) => {
          if (error) throw reject(error);
          resolve(decoded as jwt.JwtPayload);
        });
      });
    };
    ```

    quay lại code tiếp `accessTokenValidator` đoạn `options` và dùng hàm `verifyToken` vừa viết
    đồng thời xử lý lỗi để lỗi đẹp, và tường minh hơn

    ```ts
     export const accessTokenValidator = validate(
        checkSchema(
            {
                Authorization: {
                    options: async (value: string, { req }) => {
                        ...
                        if (!access_token) {

                            throw new ErrorWithStatus({
                                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                                status: HTTP_STATUS.UNAUTHORIZED
                            })
                        }
                        //kiểm tra xem access_token có hợp lệ hay không
                        //lỗi tự phát sinh trong hàm validate này sẻ là 422
                        //ở đây mình trycath để chụp lỗi từ verifyToken và đổi lại thành 401
                        try {
                          const decoded_authorization = await verifyToken({ token: access_token })
                          //nếu không có lỗi thì ta lưu decoded_authorization vào req để khi nào muốn biết ai gữi req thì dùng
                          req.decoded_authorization = decoded_authorization
                        } catch (error) {
                          throw new ErrorWithStatus({
                            //(error as JsonWebTokenError).message sẽ cho chuỗi `accesstoken invalid`, không đẹp lắm
                            //ta sẽ viết hóa chữ đầu tiên bằng .capitalize() của lodash
                            message: capitalize((error as JsonWebTokenError).message),
                            status: HTTP_STATUS.UNAUTHORIZED
                          })
                        }
                        return true //nếu không có lỗi thì trả về true
                    }
                }
            }
        )
    ```

    test thử

    ```ts
    //bên route
    usersRouter.post(
      "/logout",
      accessTokenValidator,
      wrapAsync((req, res) => {
        res.json({ message: "Logout success" });
      })
    );
    ```

    login xong lấy `ac` và `rf`
    ![Alt text](image-87.png)
    tạo request `logout post` và cài thêm ac vào
    thêm Authorization cho header
    ![Alt text](image-88.png)
    thêm refresh cho body, nhưng chưa code nên bỏ trống
    ![Alt text](image-89.png)
    test
    ![Alt text](image-90.png)
    ví dụ truyền sai authorization - thiếu bearer
    ![Alt text](image-91.png)

# refresh token middleware và logout logic

- khi mà `logout`, `client` phải truyền lên `access_token` thông qua `headers` để mình biết `client` là ai
- ngoài ra còn phải truyền lên `refresh_token` để mình tiến hành xóa trên `database` vậy nên ta phải kiểm tra `refresh_token` là thật hay giả
- tiến hành làm `refreshToken middleware`

  - trong file `messages.ts` thêm `REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid'`
  - trong `users.middlewares.ts` tạo middleware `refreshTokenValidator` có nội dung validator như sau

    ```ts
    export const refreshTokenValidator = validate(
      checkSchema(
        {
          refresh_token: {
            notEmpty: {
              errorMessage: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
            },

            custom: {
              options: async (value: string, { req }) => {
                try {
                  const decoded_refresh_token = await verifyToken({
                    token: value,
                  });
                  //verify giá trị của refresh_token xem có hợp lệ hay không, quá trình này có thể phát sinh lỗi
                  //nếu không có lỗi thì lưu decoded_refresh_token vào req để khi nào muốn biết ai gữi req thì dùng
                  //decoded_refresh_token có dạng như sau
                  //{
                  //  user_id: '64e3c037241604ad6184726c',
                  //  token_type: 1,
                  //  iat: 1693883172,
                  //  exp: 1702523172
                  //}

                  req.decoded_refresh_token = decoded_refresh_token;
                } catch (error) {
                  throw new ErrorWithStatus({
                    message: capitalize((error as JsonWebTokenError).message),
                    status: HTTP_STATUS.UNAUTHORIZED,
                  });
                }
                console.log(req.decoded_refresh_token); //xem xong ,test xong tắt
                return true; //nếu không có lỗi thì trả về true
              },
            },
          },
        },
        ["body"]
      )
    );
    ```

## chuẩn hóa req đầu vào

- ở đoạn code trên ta sẽ thấy rằng `req.decoded_refresh_token` có dạng any, và ta k biết trong có gì

- đó là vì req của ta chỉ đang là any mà thôi, ta sẽ định dạng cho req của mình, để sau này nó sẽ nhắc code cho ta tốt hơn
- `decoded_refresh_token` và `decoded_authorization` là `JwtPayload`, khi verifyToken thì sẽ trả về `JwtPayload`
  ![Alt text](image-99.png)
  và ở đây nó luôn thiếu `user_id` và `token_type`
- nên ta sẽ tạo interface mới tên `TokenPayload` kế thừa `JWTPayload` và cho `decoded_refresh_token` và `decoded_authorization` tạo ra từ nó

  - ta vào file định dạng `req` là `User.requests.ts` và thêm interface

    ```ts
    //định nghĩa req cho thằng logoutController, người dùng truyên lên trong logout có gì luôn
    export interface LogoutReqBody {
      refresh_token: string;
    }
    export interface TokenPayload extends JwtPayload {
      user_id: string;
      token_type: TokenType;
    }
    ```

  - định nghĩa `Request của express` có gì cho toàn hệ thống bằng `type.d.ts`

    ```ts
    import User from "./models/schemas/User.schema";
    import { Request } from "express";
    declare module "express" {
      interface Request {
        decoded_authorization?: TokenPayload;
        decoded_refresh_token?: TokenPayload;
      }
    }
    ```

  - ở `jwt.ts` cho khi `verify` xong thì trả ra `decode` có dạng là `TokenPayload`

    ```ts
    export const verifyToken = ({
    ...
    }) => {

      return new Promise<TokenPayload>((resolve, reject) => {//TokenPayload
        jwt.verify(token, secretOrPublicKey, (error, decoded) => {
          if (error) throw reject(error)
          resolve(decoded as TokenPayload)//đổi thành TokenPayload
        })
      })
    }
    ```

  - lúc này ở `user.middlewares.ts` ta có thể viết thành

    ```ts
    //trong accessTokenValidator
    //req.decoded_authorization = decoded_authorization //bỏ và thay thành
    const decoded_authorization = (await verifyToken({
      token: access_token,
    })) as TokenPayload;
    (req as Request).decoded_authorization = decoded_authorization;

    //tương tự với  refreshTokenValidator
    //req.decoded_refresh_token = decoded_refresh_token //bỏ và thay thành
    const decoded_refresh_token = (await verifyToken({
      token: value,
    })) as TokenPayload;
    (req as Request).decoded_refresh_token = decoded_refresh_token;
    ```

- ta vào `users.routes.ts` thêm middleware này vào 1 route nào đó để test cho tiện, cụ thể là bỏ vào logout luôn để test

  ```ts
  usersRouter.post(
    "/logout",
    accessTokenValidator,
    refreshTokenValidator,
    wrapAsync((req, res) => {
      res.json({ message: "Logout success" });
    })
  );
  ```

- ta test thử:
  - 1. ta thử logout và sẽ bị jwt hết hạn
       ![Alt text](image-92.png)
  - 2. ta đăng nhập lại để có `ac` và `rf`
       ![Alt text](image-93.png)
  - 3. copy `at` bỏ vào logout>Auth>BearerToken, tắt biến Authorization khi mình dùng Auth rồi
       ![Alt text](image-94.png)
       ![Alt text](image-96.png)
  - 4. copy `rf` bỏ vào logout>body,
       nếu bỏ trống `rf` ta sẽ có lỗi `"Refresh token is required"` 422
       nếu sai thì ta sẽ có `"Refresh token is invalid"` 401
       ![Alt text](image-95.png)
- theo mô hình thì sau khi check `rf` tồn tại trong request, verify xong, thì kiểm tra nó có tồn tại trong db hay không, nếu có thì tiến hành xóa
  ![alt text](image-284.png)

## làm logout logic

- nên giờ ta tiến hành code `logoutController` để kiểm tra xem `rf` này có trong db hay không, và phải xem rf có dúng là thuộc sỡ hữu của `user_id` lấy đc từ `at` không

  - tạo `message.ts` là `USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',` , vào viết hàm
  - `logoutController`

    ```ts
    usersRouter.post(
      "/logout",
      accessTokenValidator,
      refreshTokenValidator,
      wrapAsync(logoutController) //thêm
    );
    ```

    ```ts
    export const logoutController = async (
      req: Request<ParamsDictionary, any, LogoutReqBody>,
      res: Response
    ) => {
      //lấy refresh_token từ req.body
      const { refresh_token } = req.body;
      //lấy thêm user_id từ req.decoded_authorization
      const { user_id: user_id_at } = req.decoded_authorization as TokenPayload;
      const { user_id: user_id_rf } = req.decoded_refresh_token as TokenPayload;
      //nếu thông tin trong 2 jwt k cùng 1 user_id thì lỗi
      if (user_id_at !== user_id_rf) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID,
          status: HTTP_STATUS.UNAUTHORIZED,
        });
      }
      //kiểm tra xem refresh_token này có trong db và thuộc user_id_at không nếu k có thì throw lỗi luôn trong hàm
      await usersService.checkRefreshToken({
        user_id: user_id_at,
        refresh_token,
      }); //hàm này chưa làm
      //nếu có thì xóa nó đi
      const result = await usersService.logout(refresh_token); //hàm này chưa làm
      return res.status(HTTP_STATUS.OK).json(result);
    };
    ```

  - 1. `message.ts` thêm `LOGOUT_SUCCESS: 'Logout success'`
  - 2. `users.service.ts` thêm hàm logout - nhiệm vụ là vào db tìm và xóa refresh_token đc chỉ định, return ra thông báo LOGOUT_SUCCESS

    ```ts
      async checkRefreshToken(refresh_token: string) {
        const refreshToken = await databaseService.refreshTokens.findOne({
          token: refresh_token,
          user_id: new ObjectId(user_id)
        })
        if (!refreshToken) {
          throw new ErrorWithStatus({
            message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID,
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }
        return refreshToken
      }

      async logout(refresh_token: string) {
        await databaseService.refreshTokens.deleteOne({ token: refresh_token })
        return {
          message: USERS_MESSAGES.LOGOUT_SUCCESS
        }
      }
    ```

- test lại logout
- 1. ta thử logout và sẽ bị jwt hết hạn
     ![alt text](image-285.png)
- 2. access_token và refresh_token của 2 account khác nhau
     ![alt text](image-286.png)
- 3. refresh_token đã bị xóa
     ![alt text](image-287.png)

# tinh chỉnh hiệu năng 1 tý để flow code tốt hơn

- trong `.env` ta thấy rằng ta chỉ dùng 1 JWT_SECRET để sign và verify cho cả access, refresh và sau này là mail
  điều này vô hình chung làm cho code của ta k bảo mật và chặc chẽ, nên giờ ta sẽ tạo riêng cho chúng 3 cái token khác nhau luôn

  ```
    // JWT_SECRET = '123!@#' thay thành
    JWT_SECRET_ACCESS_TOKEN = '123!@#1'
    JWT_SECRET_REFRESH_TOKEN = '123!@#2'
    JWT_SECRET_EMAIL_VERIFY_TOKEN = '123!@#2'
  ```

  - code lại `signToken` và `verifyToken` trong `jwt.ts`

  ```ts
  export const signToken = ({
    payload,
    //privateKey = process.env.JWT_SECRET as string,
    privateKey,
    options = { algorithm: 'HS256' }
  }: {
  payload: object | string | Buffer
  privateKey: string // bỏ ? để ép truyền vào

  //tương tự với verifyToken
  export const verifyToken = ({
    token,
    //secretOrPublicKey = process.env.JWT_SECRET as string
    secretOrPublicKey,
  }: {
    token: string
    secretOrPublicKey: string //bỏ ? để ép truyền vào
  ```

  - ta làm vậy thì cách xài verify đã thay đổi, nên nó sẽ lỗi ở những chỗ dùng signToken và verifyToken

    - 1.  `users.services.ts > UsersService `

    ```ts
    class UsersService {
      private signAccessToken(user_id: string) {
        return signToken({
          payload: { user_id, token_type: TokenType.AccessToken },
          options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN },
          privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string //thêm
        })
      }
      private signRefreshToken(user_id: string) {
        return signToken({
          payload: { user_id, token_type: TokenType.RefreshToken },
          options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN },
          privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string //thêm
        })
      }
      ...
    ```

    - 2.trong `users.middlewares.ts`

    ```ts
    //trong accessTokenValidator ,đoạn
    // const decoded_authorization = await verifyToken({ token: access_token }) đổi thành
    const decoded_authorization = (await verifyToken({
      token: access_token,
      secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
    })) as TokenPayload;

    //trong refreshTokenValidator ,đoạn
    const decoded_refresh_token = (await verifyToken({
      token: value,
      secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
    })) as TokenPayload;
    ```

- nếu request login|logout thiếu access_token hay refresh_token thì ta sẽ trả về lỗi 422(sai validator), điều này mình không thích, vì lỗi thiếu đó mình muốn là 401: UnAuthorized
  vậy nên mình sẽ fix lại các middlewares `accessTokenValidator` và `refreshTokenValidator`

  ```ts
  //đoạn của accessTokenValidator, ta thêm trim để xóa khoảng cách thừa và
  export const accessTokenValidator = validate(
    checkSchema(
      {
        Authorization: {
          trim: true, //thêm
          custom: {
            options: async (value: string, { req }) => {
              const access_token = (value || '').split(' ')[1]
      ...


  //đoạn của refreshTokenValidator, ta thêm trim để xóa khoảng cách thừa và
  export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true, //thêm
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED //401
              })
            }
            try {
              ...
  ```

- giờ ta test lại postman 1 lần

# tối ưu hóa postman

- tạo enviroment cho postman
  ![Alt text](image-100.png)
  chọn add
- tạo các biến
  ![Alt text](image-101.png)
- cho logout xài biến luôn
  ![Alt text](image-103.png)
  ![Alt text](image-104.png)
- set access_token cho toàn thư mục
  folder>users>authorization>type>Bearer Token>
  ![Alt text](image-105.png)
  logout chỉ cần `inherit autho from parent`
  ![Alt text](image-106.png)

- tự động lưu access và refresh token vào envi

  - login ta thêm script vào task `test`

  ```js
  pm.test("Login thành công", function () {
    pm.response.to.have.status(200);
    let responseJson = pm.response.json();
    const { access_token, refresh_token } = responseJson.result;
    pm.environment.set("access_token", access_token);
    pm.environment.set("refresh_token", refresh_token);
  });
  ```

  ![alt text](image-288.png)![alt text](image-289.png)

- và test lại bth giữa login và logout
