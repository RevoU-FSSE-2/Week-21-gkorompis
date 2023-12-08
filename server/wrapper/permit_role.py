from flask import request, jsonify

# def permit_role(func):
#     try:
#         def wrapper(*args, **kwargs):
#             try:
#                 return func(*args, **kwargs)
#             except Exception as e:
#                 errorMessage = {"message": str(e)}
#                 return jsonify(errorMessage), 500
#         wrapper.__name__ = func.__name__
#         return wrapper
#     except Exception as e:
#         errorMessage = {"message": str(e)}
#         return jsonify(errorMessage), 500



    
def permit_role_custom(custom_list, restrict_query_name="unknown_field"):
    try:
        def permit_role(func):
            try:
                def wrapper(wrapper_data, *args, **kwargs):
                    try:
                        token_info = wrapper_data.get("token_info")

                        user_username = token_info.get("username")
                        user_role = token_info.get("role") if token_info else "role_unknown"
                        roles_list = custom_list if custom_list else []
                        isPermitted = True if user_role in roles_list else False
                        print(">>> list of roles", roles_list)
                        print(">>> is permitted:", isPermitted)
                        if not isPermitted:
                            errorMessage = {"message": "Forbidden access 403."}
                            return jsonify(errorMessage), 403
                        restrict_query = {restrict_query_name: user_username} if user_role == "member" else {}

                        #restrict_query = {restrict_query_name: user_username} if restrict_query_name else {}
                        wrapper_data = { **wrapper_data, "restrict_query": restrict_query}
                        print(">>>wrapper_data 2", wrapper_data)
                        return func(wrapper_data, *args, **kwargs)
                    except Exception as e:
                        errorMessage = {"message": str(e)}
                        return jsonify(errorMessage), 500
                wrapper.__name__ = func.__name__
                return wrapper
            except Exception as e:
                errorMessage = {"message": str(e)}
                return jsonify(errorMessage), 500
        return permit_role
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500