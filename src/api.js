export const getApi = async (url) => {
    let response = await fetch(url)
    console.log("the response is", response)
    let responseJson = await response.json()
    return responseJson

  }