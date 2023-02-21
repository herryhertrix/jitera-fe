import Cookies from "js-cookie";

const KEY = "jiteraaretij"

export function loadState() {
  try {
    const serializedState: any = Cookies.get(KEY)
    if (!serializedState){
      return {
        user: undefined,
      }
    }
    const data = JSON.parse(serializedState)
    return {
      user: data,
    };
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    Cookies.set(KEY, serializedState)
  } catch (e) {
    // Ignore
  }
}

export function deleteState() {
  try {
    Cookies.set(KEY, "")
  } catch (e) {
    // Ignore
  }
}