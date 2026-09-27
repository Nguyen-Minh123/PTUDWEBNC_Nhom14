namespace CulinaryBlog.Application.Common.Interfaces;

public interface IBackgroundJobQueue
{
    void EnqueueDeleteFile(string fileUrl);
}