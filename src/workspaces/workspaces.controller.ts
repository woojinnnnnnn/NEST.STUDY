import { Body, Controller, Get, Param, Query, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("WORK-SPACE")
@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getMyWorkspaces() {}

    @Post()
    createWorkspaces() {}

    @Get(':url/members')
    getAllMembersFromWorkspace() {}

    @Post(':url/members')
    inviteMembersToWorkspace() {}

    @Delete(':url/members/:id')
    kickMembersFromWorkspace() {}

    @Get(':url/members/:id')
    getMemberInfoInWorkspace() {}
}
