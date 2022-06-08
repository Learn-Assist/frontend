import { useMutation, useQuery } from "react-query";
import { user } from "../store/types";
import { useContext } from "react";
import StoreContext, { actions } from "../store";
import axios from "axios";
import { BACKEND_URL } from "../config";

const create = (user: user) => {
	return axios.post(BACKEND_URL + "/user", user);
};

const get = (uid: string) => {
	return axios.get(BACKEND_URL + "/user/" + uid);
};

export const useCreate = () => {
	const { dispatch } = useContext(StoreContext);
	return useMutation(create, {
		onSuccess: (user) => {
			dispatch(actions.user.setUser(user.data));
		},
		onError: (err: any) => {
			dispatch(actions.toast.addErrorShort(err.message));
		},
	});
};

export const useGet = (uid: string) => {
	const { dispatch } = useContext(StoreContext);

	return useQuery("user", () => get(uid), {
		enabled: !!uid,
		refetchOnReconnect: false,
		onSuccess: (user) => {
			dispatch(actions.user.setUser(user.data));
			if (!user.data?.uid) alert("user is null");
		},
		onError: (err: any) => {
			console.log("user fetching error:", err);
			dispatch(actions.toast.addErrorShort(err.message));
		},
	});
};
