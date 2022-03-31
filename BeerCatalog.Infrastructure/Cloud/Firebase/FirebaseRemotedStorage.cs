using BeerCatalog.Application.Interfaces.Cloud;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Infrastructure.Cloud.Firebase.Models;
using Firebase.Auth;
using Firebase.Storage;
using Microsoft.Extensions.Options;

namespace BeerCatalog.Infrastructure.Cloud.Firebase;

public class FirebaseRemoteStorage : IRemoteStorage
{
    private readonly FirebaseSettings _firebaseSettings;
    
    public FirebaseRemoteStorage(IOptions<FirebaseSettings> firebaseConfig)
    {
        _firebaseSettings = firebaseConfig.Value;
    }
    
    public async Task<string> UploadFileAsync(Guid id, MemoryStream file)
    {
        var avatars = await GetAvatarsDirectoryAsync();
        
        var downloadLink = await avatars.Child(id.ToString())
            .PutAsync(file);

        return downloadLink;
    }

    public async Task DeleteFileAsync(Guid id)
    {
        var avatars = await GetAvatarsDirectoryAsync();

        await avatars
            .Child(id.ToString())
            .DeleteAsync();
    }

    private async Task<FirebaseStorageReference> GetAvatarsDirectoryAsync()
    {
        var firebaseAuthProvider = new FirebaseAuthProvider(new FirebaseConfig(_firebaseSettings.ApiKey));
        
        var authLink = await firebaseAuthProvider.SignInWithEmailAndPasswordAsync(_firebaseSettings.Email,
            _firebaseSettings.Password);

        return new FirebaseStorage(_firebaseSettings.Bucket, new()
            {
                AuthTokenAsyncFactory = () => Task.FromResult(authLink.FirebaseToken),
                ThrowOnCancel = true
            })
            .Child("avatars");
    }
}