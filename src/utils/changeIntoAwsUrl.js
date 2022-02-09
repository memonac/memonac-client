function changeIntoAwsUrl(file) {
  return `https://okongee-project.s3.${process.env.REACT_APP_AWS_BUCKET_REGION}.amazonaws.com/${file.key}`;
}

export default changeIntoAwsUrl;
