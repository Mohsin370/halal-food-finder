using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;

namespace backend.Helpers
{
    public class CloudinaryFTP
    {

        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _configuration;
        public CloudinaryFTP(IConfiguration configuration)
        {
             _configuration = configuration;
            //            DotEnv.Load(new DotEnvOptions(probeForEnv: true)); // Load .env

            string cloudinaryUrl = _configuration["CLOUDINARY_URL"];
            if (string.IsNullOrEmpty(cloudinaryUrl))
            {
                throw new Exception("CLOUDINARY_URL is not set in environment variables.");
            }
            _cloudinary = new Cloudinary(cloudinaryUrl);
            _cloudinary.Api.Secure = true;
        }


        public async Task<ImageUploadResult> UploadImage(string imageBase64)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription("data:image/png;base64," + imageBase64),
                Transformation = new Transformation().Quality("auto:good").FetchFormat("webp"),
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true
            };
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult; 
        }
    }
}
