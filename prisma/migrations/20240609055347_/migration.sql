-- DropForeignKey
ALTER TABLE "NoticeComment" DROP CONSTRAINT "NoticeComment_noticeId_fkey";

-- AddForeignKey
ALTER TABLE "NoticeComment" ADD CONSTRAINT "NoticeComment_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
