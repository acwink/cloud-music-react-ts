import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

function withRouter<T>(WrapperComponent: React.FC<T>) {
  return function (props: T) {
    // 1. 导航
    const navigate = useNavigate();
    // 2. 动态路由的参数
    const params = useParams();
    // 3. 查询字符串的参数
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const query = Object.fromEntries(searchParams);

    const router = { navigate, params, location, query };

    return <WrapperComponent {...props} router={router}></WrapperComponent>;
  };
}

export default withRouter;
