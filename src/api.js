export const getApi = async (url) => {
    let response = await fetch(url)
    console.log("the response is", response)
    let responseJson = await response.json()
    return responseJson
  }

export const getGiphy = async text => {
    const url = `http://api.giphy.com/v1/gifs/search?api_key=Y99QRjzrSNP0HucWPPtXMnNJh3ERdf1o&q=${text}`;
    let response = await fetch(url)
    //console.log("the response is", response)
    let gif = await response.json()
    const gifImage =
      gif.data[Math.floor(Math.random() * 25)].images.original.url;
    console.log("the gif image is", gifImage)
    return gifImage;
  };
