const { GET_GENDOU_API_URL } = process.env

// info API for v1/v2
export const fetchPrizeInfo = async (axios, githubUserId) => {
  const url = GET_GENDOU_API_URL + `/info/${githubUserId}`
  return await axios.get(url)
}

// claimUrl API for v1
export const fetchClaimUrl = async (axios, code) => {
  const url = GET_GENDOU_API_URL + `/findClaimUrl`
  return await axios.post(url, { code })
}

// infoByCode API for v2
export const fetchInfoByCode = async (axios, code) => {
  const url = GET_GENDOU_API_URL + `/infoByCode`
  return await axios.post(url, { code })
}

// entry API for v2
export const postEntry = async (axios, code, signature) => {
  const url = GET_GENDOU_API_URL + `/entry`
  return await axios.post(url, { code, sign: signature })
}
