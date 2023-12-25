from flask import request, jsonify

def allow_modify_fields(allowed_field_list=[], excused_roles=["admin"]):
    try:
        def allow_fields(func):
            try:
                def wrapper(wrapper_data, *args, **kwargs):
                    try:
                        token_info = wrapper_data.get("token_info")
                        user_role = token_info.get("role") if token_info else "role_unknown"
                        if user_role not in excused_roles:
                            request_body = request.json
                            print(">>>allow_modify_fields", request_body)
                            print(">>>allow_modify_fields keys", request_body.keys())
                            if not request_body:
                                errorMessage = {"message": "bad request. Body is expected"}
                                return jsonify(errorMessage), 400
                            for key in request_body.keys():
                                if key not in allowed_field_list:
                                    errorMessage = {"message": f"fields {key} can't be modified. Allowed fields to modify: {str(allowed_field_list)}"}
                                    return jsonify(errorMessage), 403
                        print(">>>wrapper_data 3", wrapper_data)
                        return func(wrapper_data, *args, **kwargs)
                    except Exception as e:
                        errorMessage = {"message": str(e), "script": f"error at wrapper, {allow_modify_fields.__name__}!"}
                        return jsonify(errorMessage), 500
                wrapper.__name__ = func.__name__
                return wrapper
            except Exception as e:
                errorMessage = {"message": str(e),  "script": f"error at allow_fields, {allow_modify_fields.__name__}!"}
                return jsonify(errorMessage), 500
        return allow_fields
    except Exception as e:
        errorMessage = {"message": str(e),  "script": f"error at parent, {allow_modify_fields.__name__}!"}
        return jsonify(errorMessage), 500