namespace BeerCatalog.Application.Interfaces.Cloud;

public interface IRemoteStorage
{
    Task<string> UploadFileAsync(Guid id, MemoryStream file);
    Task DeleteFileAsync(Guid id);
}