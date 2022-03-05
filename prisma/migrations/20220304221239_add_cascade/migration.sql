-- DropForeignKey
ALTER TABLE "TagOnAnimation" DROP CONSTRAINT "TagOnAnimation_animationId_fkey";

-- AddForeignKey
ALTER TABLE "TagOnAnimation" ADD CONSTRAINT "TagOnAnimation_animationId_fkey" FOREIGN KEY ("animationId") REFERENCES "Animation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
