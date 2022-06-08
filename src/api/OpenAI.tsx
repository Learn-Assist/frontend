import axios from "axios";
import { useMutation } from "react-query";
import { OpenAIApiUrl as url } from "../config";
import { STT } from "./Rasa";
const py2nl = (code: string) => {
	const str = code + ' \n """ \n Here\'s what the above code is doing: \n     ';
	return axios.post(url + "/api/py2nl", { code: str });
};

const nl2Py = (nl: string) => {
	const str = '""" \n' + nl + ' \n """';
	return axios.post(url + "/api/nl2py", { nlp: str });
};

const quickDoubts = (params: { keyword: string; question: string }) => {
	return axios.post(url + "/api/qa", {
		keyword: params.keyword,
		question: params.question,
	});
};

const getNotes = (input: string) => {
	return axios.post(url + "/api/notes", { input });
};

const getSuggestion = (input: string) => {
	return axios.post(url + "/api/suggestion", { input });
};

const getQuestions = (input: string) => {
	return axios.post(url + "/api/qa-colab", { input });
};

const getQuestionsFromFile = (input: any) => {
	return axios.post(url + "/api/qa-colab-file", { input });
};

export const usePy2Nl = () => {
	return useMutation(py2nl, {
		onSuccess: (data) => {
			STT(data.data);
		},
		onError: (error) => {},
	});
};

export const useNl2Py = () => {
	return useMutation(nl2Py, {
		onSuccess: (data) => {
			STT(data.data);
		},
		onError: (error) => {},
	});
};

export const useQuickDoubts = () => {
	return useMutation(quickDoubts, {
		onSuccess: (data) => {
			STT(data.data);
		},
		onError: (error) => {},
	});
};

export const useGetNotes = () => {
	return useMutation(getNotes, {
		onSuccess: (data) => {
			STT(data.data);
		},
		onError: (error) => {},
	});
};

export const useSuggestion = () => {
	return useMutation(getSuggestion, {
		onSuccess: (data) => {
			STT(data.data);
		},
		onError: (error) => {},
	});
};

export const useGetQuestions = () => {
	return useMutation(getQuestions, {
		onSuccess: (data) => {},
		onError: (error) => {},
	});
};

export const useGetQuestionsFromFile = () => {
	return useMutation(getQuestionsFromFile, {
		onSuccess: (data) => {},
		onError: (error) => {},
	});
};
